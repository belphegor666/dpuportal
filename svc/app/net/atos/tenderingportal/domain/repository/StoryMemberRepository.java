package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.model.StoryMember;

import java.util.List;

public interface StoryMemberRepository extends GenericRepository<Long, StoryMember> {

    List<StoryMember> getMembersOfStory(Long storyId);

    List<StoryMember> findStoriesInSprintForUser(Long sprintId, String sprintUserEmail);

    //List<StoryDto> findStoriesAssignedToUser(String email);

}