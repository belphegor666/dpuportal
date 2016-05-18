package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.dto.SprintDto;
import net.atos.tenderingportal.domain.model.Project;
import net.atos.tenderingportal.domain.model.Sprint;
import net.atos.tenderingportal.domain.model.SprintUser;
import net.atos.tenderingportal.domain.model.SprintUserPK;
import net.atos.tenderingportal.domain.repository.SprintRepository;
import net.atos.tenderingportal.domain.repository.SprintUserRepository;
import net.atos.tenderingportal.domain.util.SprintMapper;

import javax.inject.Inject;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SprintService {

    private SprintRepository sprintRepository;
    private SprintUserRepository sprintUserRepository;

    @Inject
    public SprintService(SprintRepository sprintRepository, SprintUserRepository sprintUserRepository) {
        this.sprintRepository = sprintRepository;
        this.sprintUserRepository = sprintUserRepository;
    }

    public Sprint createSprintForProject(Long projectId, Sprint sprint) {
        Project project = new Project();
        project.setId(projectId);
        sprint.setProject(project);
        sprintRepository.save(sprint);
        return sprint;
    }

    public List<SprintDto> getAllSprintsForProject(Long projectId){
        List<Sprint> sprintList = sprintRepository.findAllByProject(projectId);
        List<SprintDto> mappedSprints = new ArrayList<SprintDto>();
        for(Sprint sprint : sprintList) {
            mappedSprints.add(mapSprint(sprint));
        }
        return mappedSprints;
    }

    private SprintDto mapSprint(Sprint sprint) {
        SprintMapper sprintMapper = new SprintMapper();
        return sprintMapper.mapSprintToDto(sprint);
    }

    public Sprint getCurrentSprintForProject(Long projectId) {

        List<Sprint> sprintsList = sprintRepository.findAllByProject(projectId);

        Sprint sprint;
        Date now = new Date();
        for(int i = 0; i < sprintsList.size(); i++) {
            sprint = sprintsList.get(i);
            if((sprint.getStartDate().compareTo(formattedDate(now)) <= 0) && (sprint.getEndDate().compareTo(formattedDate(now)) >= 0)) {
                return sprint;
            }
        }
        return null;
    }

    public void addMemberToSprint(Long userId, Long sprintId, String role) {
        SprintUserPK sprintUserPK = new SprintUserPK();
        sprintUserPK.setSprintId(sprintId);
        sprintUserPK.setUserId(userId);
        SprintUser sprintUser = new SprintUser();
        sprintUser.setId(sprintUserPK);
        sprintUser.setRole(role);
        sprintUserRepository.save(sprintUser);
    }

    public void removeMemberFromSprint(Long userId, Long sprintId) {
        SprintUserPK sprintUserPK = new SprintUserPK();
        sprintUserPK.setSprintId(sprintId);
        sprintUserPK.setUserId(userId);
        SprintUser sprintUser = new SprintUser();
        sprintUser.setId(sprintUserPK);
        sprintUserRepository.deleteMemberFromSprint(sprintUser);
    }

    private Date formattedDate(Date d){
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
            String dateString = df.format(d);
            Date formattedDate = df.parse(dateString);
            return formattedDate;
        } catch (Exception e){

        }

        return null;
    }
}