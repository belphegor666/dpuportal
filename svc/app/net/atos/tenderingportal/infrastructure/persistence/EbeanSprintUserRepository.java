package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.dto.SprintDto;
import net.atos.tenderingportal.domain.model.Project;
import net.atos.tenderingportal.domain.model.Sprint;
import net.atos.tenderingportal.domain.model.SprintUser;
import net.atos.tenderingportal.domain.repository.SprintUserRepository;
import net.atos.tenderingportal.domain.util.ProjectMapper;
import net.atos.tenderingportal.domain.util.SprintMapper;

import java.util.ArrayList;
import java.util.List;

public class EbeanSprintUserRepository extends EbeanGenericRepository<Long, SprintUser> implements SprintUserRepository {

    @Override
    Class<SprintUser> getTClass() {
        return SprintUser.class;
    }

    public List<SprintUser> getAllJoinedSprints(Long userId) {
        List<SprintUser> joinedSprints = FINDER.fetch("user").where().eq("user.userId", userId).findList();
        return joinedSprints;
    }

    public List<SprintUser> getMembersOfSprint(Long sprintId) {
        List<SprintUser> membersOfSprint = FINDER.fetch("sprint").where().eq("sprint.id", sprintId).findList();
        return membersOfSprint;
    }



    public void deleteMemberFromSprint(SprintUser sprintUser){
        FINDER.db().delete(sprintUser);
    }

    @Override
    public List<ProjectDto> findProjectsAssignedToUser(Long userId) {
        List<SprintUser> sprintUsers = FINDER.fetch("user").where().eq("user.userId", userId).findList();
        List<ProjectDto> assignedProjects = new ArrayList<>();
        ProjectMapper projectMapper = new ProjectMapper();
        SprintMapper sprintMapper = new SprintMapper();

        for (SprintUser sprintUser: sprintUsers){
            Sprint sprint = sprintUser.getSprint();
            Project project = sprint.getProject();
            ProjectDto projectDto = projectMapper.mapProjectToDto(project);
            sprint.getSprintUsers().clear();
            sprint.getSprintUsers().add(sprintUser);

            SprintDto sprintDto = sprintMapper.mapSprintToDto(sprint);


            if (!assignedProjects.contains(projectDto)){
                projectDto.getSprints().add(sprintDto);
                assignedProjects.add(projectDto);
            }else{
                assignedProjects.get(assignedProjects.indexOf(projectDto)).getSprints().add(sprintDto);
            }
        }

        return assignedProjects;
    }
}