package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.StoryMember;
import net.atos.tenderingportal.domain.repository.StoryMemberRepository;

import java.util.List;

public class EbeanStoryMemberRepository extends EbeanGenericRepository<Long, StoryMember> implements StoryMemberRepository {

    @Override
    Class<StoryMember> getTClass() {
        return StoryMember.class;
    }

    @Override
    public List<StoryMember> getMembersOfStory(Long storyId) {
        List<StoryMember> storyMemberList = FINDER.fetch("story").where().eq("story.storyId", storyId).findList();
        return storyMemberList;
    }

    @Override
    public List<StoryMember> findStoriesInSprintForUser(Long sprintId, String sprintUserEmail) {
        return FINDER.fetch("story").where().eq("story.sprint.sprintId", sprintId)
                .eq("email", sprintUserEmail).findList();
    }
}