package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.model.SprintUser;

import java.util.List;

public interface SprintUserRepository extends GenericRepository<Long, SprintUser> {

    List<SprintUser> getAllJoinedSprints(Long userId);

    List<SprintUser> getMembersOfSprint(Long sprintId);

    void deleteMemberFromSprint(SprintUser sprintUser);

    List<ProjectDto> findProjectsAssignedToUser(Long userId);

}