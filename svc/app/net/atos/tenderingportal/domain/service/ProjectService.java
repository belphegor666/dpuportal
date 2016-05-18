package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.enums.SystemRole;
import net.atos.tenderingportal.domain.exception.OperationNotPermittedException;
import net.atos.tenderingportal.domain.model.*;
import net.atos.tenderingportal.domain.repository.*;
import net.atos.tenderingportal.domain.util.CSVWriter;
import net.atos.tenderingportal.domain.util.ProjectMapper;
import net.atos.tenderingportal.domain.util.SprintMapper;

import javax.inject.Inject;
import java.util.*;

public class ProjectService {

    private ProjectRepository projectRepository;

    private UserRepository userRepository;

    private SprintRepository sprintRepository;

    private SprintUserRepository sprintUserRepository;

    private StoryMemberRepository storyMemberRepository;

    private ProjectMapper projectMapper;

    private SprintMapper sprintMapper;

    @Inject
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository,
                          SprintRepository sprintRepository, SprintUserRepository sprintUserRepository,
                          StoryMemberRepository storyMemberRepository, ProjectMapper projectMapper,
                          SprintMapper sprintMapper) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.sprintRepository = sprintRepository;
        this.sprintUserRepository = sprintUserRepository;
        this.storyMemberRepository = storyMemberRepository;
        this.projectMapper = projectMapper;
        this.sprintMapper = sprintMapper;
    }

    public Project createProject(Project project, Long userId) {
        User user = new User();
        user.setUserId(userId);
        project.setUser(user);
        User persistedUser = userRepository.findById(userId);
        if(null != persistedUser){
            project.setProductOwner(persistedUser.getEmail());
        }
        project.setCreatedDate(new Date());
        projectRepository.save(project);
        return project;
    }

    public List<ProjectDto> getProjects(Long userId, Boolean currentSprint, Boolean productOwner){
        User persistedUser = userRepository.findById(userId);
        if (currentSprint != null && currentSprint.TRUE){
            return findProjectsWithActiveSprintsForDate(new Date());
        }

        else if (productOwner != null && productOwner.TRUE){
            return findAllProjectsAsProductOwner(persistedUser.getEmail());
        }

        return findAllProjects();
    }

    private List<ProjectDto> findAllProjects(){
        List<Project> result = projectRepository.findAll();
        return mapProjects(result);
     }

    private List<ProjectDto> findAllProjectsAsProductOwner(String email){
        List<Project> result = projectRepository.findAllByProductOwner(email);
        return mapProjects(result);
    }

    private List<ProjectDto> mapProjects(List<Project> projects){
        List<ProjectDto> mappedProjects = new ArrayList<>(projects.size());

        for (Project project: projects){
            mappedProjects.add(projectMapper.mapProjectToDto(project));
        }

        return mappedProjects;
    }

    private List<ProjectDto> findProjectsWithActiveSprintsForDate(Date selectedDate){

        List<ProjectDto> projects = new ArrayList<>();

        // Each Sprint contains a reference to the Project it is for, and the members of that Sprint, so the starting
        // point is to get a list of all Sprints running on the selected date.
        List<Sprint> activeSprints = sprintRepository.findActiveSprintsByDate(selectedDate);

        // From the list of Sprints, construct a list of ProjectDto that map Projects.
        if (activeSprints != null) {
            for (Sprint sprint : activeSprints) {
                // Map of Sprint User IDs and their "story allocations"
                Map<Long, List<StoryMember>> sprintUserStoryAllocations = new HashMap<>();

                // Retrieve the story allocations for each Sprint member. Note: This can include the same Story more
                // than once per member because they may be playing more than one role on this Story during the Sprint.
                for (SprintUser sprintMember : sprint.getSprintUsers()) {
                    List<StoryMember> storyAllocations = storyMemberRepository.findStoriesInSprintForUser(sprint.getSprintId(), sprintMember.getUser().getEmail());

                    // Put each Sprint member's story allocations into the Sprint User story allocations map
                    Optional<User> user = Optional.of(sprintMember.getUser());
                    user.ifPresent(theUser -> sprintUserStoryAllocations.put(theUser.getUserId(), storyAllocations));
                }

                ProjectDto projectDto = projectMapper.mapProjectToDto(sprint.getProject());

                // Pass the Sprint User story allocations map to the Sprint mapper, so the Stories get mapped to each
                // SprintUserDto for a Sprint member who has an allocation
                projectDto.getSprints().add(sprintMapper.mapSprintToDto(sprint, sprintUserStoryAllocations));
                projects.add(projectDto);
            }
        }
        return projects;
    }

    /**
     * Gets all projects that have a Sprint running on the selected date, and the team for that Sprint.
     *
     * @param selectedDate The date for which to look for all running Sprints
     * @return A list of {@link ProjectDto}s that map Projects
     */
    public List<ProjectDto> getProjectsWithTeams(Date selectedDate) {
        return findProjectsWithActiveSprintsForDate(selectedDate);
    }

    public Project cancelProject(Long projectId) {
        Project retrievedProject = projectRepository.findById(projectId);
        if(null != retrievedProject) {
            //retrievedProject.setStatus(ProjectStatus.CANCELLED);
            projectRepository.update(retrievedProject);
        }
        return retrievedProject;
    }

    public Project updateProject(Project project, Long userId) throws OperationNotPermittedException {
        // Updates to a project should be permitted only if the user is the Product Owner or has the "Admin" system role.
        Optional<User> user = Optional.of(userRepository.findById(userId));

        if (user.isPresent()) {
            User theUser = user.get();
            // NOTE: When checking the user's e-mail address against the project's Product Owner, the check must be done
            // against what is currently held in the database for that project, and NOT the project passed in the request.
            // Otherwise, the request can be hacked so that the requester changes the Product Owner to themselves!
            Optional<Project> existingProject = Optional.ofNullable(projectRepository.findById(project.getId()));

            if (existingProject.isPresent()) {
                Project theProject = existingProject.get();

                if (theUser.getEmail().equals(theProject.getProductOwner()) || theUser.getRole().equals(SystemRole.ADMIN)) {
                    projectRepository.update(project);
                } else {
                    throw new OperationNotPermittedException("User is not permitted to update this Requirement; must be " +
                            "Product Owner or System Administrator to do so.");
                }
            }
        }

        return project;
    }

    public String generateProjectTeamCsv(Date selectedDate){
        List<ProjectDto> projects = findProjectsWithActiveSprintsForDate(selectedDate);
        CSVWriter csvWriter = new CSVWriter();
        return csvWriter.write(projects);
    }
}

