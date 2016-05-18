package net.atos.tenderingportal.domain.util;

import net.atos.tenderingportal.domain.dto.CertificationDto;
import net.atos.tenderingportal.domain.dto.SprintDto;
import net.atos.tenderingportal.domain.dto.SprintUserDto;
import net.atos.tenderingportal.domain.dto.StoryMemberDto;
import net.atos.tenderingportal.domain.enums.SprintStatus;
import net.atos.tenderingportal.domain.model.*;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by a149635 on 10/12/2015.
 */
public class SprintMapper {

    private StoryMemberMapper storyMemberMapper;
    private CertificationMapper certificationMapper;

    public SprintMapper() {
        this.storyMemberMapper = new StoryMemberMapper();
        this.certificationMapper = new CertificationMapper();
    };

    public SprintDto mapSprintToDto(Sprint sprint) {
        SprintDto sprintDto = new SprintDto();
        sprintDto.setSprintId(sprint.getSprintId());
        sprintDto.setTitle(sprint.getTitle());
        sprintDto.setDescription(sprint.getDescription());
        sprintDto.setEndDate(sprint.getEndDate());
        sprintDto.setProjectId(sprint.getProject().getId());
        sprintDto.setSprintNo(sprint.getSprintNo());
        sprintDto.setStatus(getStatus(sprint));
        sprintDto.setMembers(mapMemberToDto(sprint.getSprintUsers(), null));
        sprintDto.setStartDate(sprint.getStartDate());
        return sprintDto;
    }

    /**
     * Maps a Sprint to a SprintDto and also maps story allocations to the corresponding SprintUserDto, for each user that
     * has an allocation.
     *
     * @param sprint The Sprint to map
     * @param storyAllocations The map of Sprint User IDs and story allocations
     * @return A SprintDto with the mapping
     */
    public SprintDto mapSprintToDto(Sprint sprint, Map<Long, List<StoryMember>> storyAllocations) {
        SprintDto sprintDto = new SprintDto();
        sprintDto.setSprintId(sprint.getSprintId());
        sprintDto.setTitle(sprint.getTitle());
        sprintDto.setDescription(sprint.getDescription());
        sprintDto.setEndDate(sprint.getEndDate());
        sprintDto.setProjectId(sprint.getProject().getId());
        sprintDto.setSprintNo(sprint.getSprintNo());
        sprintDto.setStatus(getStatus(sprint));
        sprintDto.setMembers(mapMemberToDto(sprint.getSprintUsers(), storyAllocations));
        sprintDto.setStartDate(sprint.getStartDate());
        return sprintDto;
    }

    private String getStatus(Sprint sprint) {
        String status = null;
        Date today = new Date();

        if(today.after(sprint.getEndDate())) {
            status = SprintStatus.COMPLETED.getValue();
        }

        if(today.after(sprint.getStartDate()) && today.before(sprint.getEndDate())) {
            status = SprintStatus.IN_PROGRESS.getValue();
        }

        if(today.before(sprint.getStartDate())) {
            status = SprintStatus.PLANNED.getValue();
        }

        return status;
    }

    private List<SprintUserDto> mapMemberToDto(List<SprintUser> sprintUsersList, Map<Long, List<StoryMember>> storyAllocations){
        List<SprintUserDto> sprintUserDtoList = new ArrayList<>();
        if(null != sprintUsersList ){

            for(SprintUser sprintUser : sprintUsersList) {
                if(null != sprintUser) {
                    SprintUserDto sprintUserDto = new SprintUserDto();
                    sprintUserDto.setRole(sprintUser.getRole());
                    User user = sprintUser.getUser();
                    if(null != user) {
                        sprintUserDto.setEmail(user.getEmail());
                        sprintUserDto.setForename(user.getFirstName());
                        sprintUserDto.setId(user.getUserId());
                        sprintUserDto.setJobTitle(user.getTitle());
                        sprintUserDto.setSurname(user.getLastName());

                        if (storyAllocations != null) {
                            List<StoryMemberDto> storyAllocationsForUser = storyAllocations.get(user.getUserId()).stream().map(mapStoryMemberToDto).collect(Collectors.toList());
                            sprintUserDto.setStoryAllocations(storyAllocationsForUser);
                        }

                        List<Certification> userCertifications = user.getCertifications();

                        if (userCertifications != null) {
                            List<CertificationDto> certifications = userCertifications.stream().map(mapCertificationToDto).collect(Collectors.toList());
                            sprintUserDto.setCertifications(certifications);
                        }

                        sprintUserDtoList.add(sprintUserDto);
                    }
                }
            }
        }

        return sprintUserDtoList;
    }

    Function<StoryMember, StoryMemberDto> mapStoryMemberToDto = new Function<StoryMember, StoryMemberDto>() {
        @Override
        public StoryMemberDto apply(StoryMember storyMember) {
            return storyMemberMapper.mapStoryMemberToDto(storyMember);
        }
    };

    Function<Certification, CertificationDto> mapCertificationToDto = new Function<Certification, CertificationDto>() {
        @Override
        public CertificationDto apply(Certification certification) {
            return certificationMapper.mapCertificationToDto(certification);
        }
    };
}
