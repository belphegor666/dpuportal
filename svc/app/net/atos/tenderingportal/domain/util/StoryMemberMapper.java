package net.atos.tenderingportal.domain.util;

import net.atos.tenderingportal.domain.dto.StoryMemberDto;
import net.atos.tenderingportal.domain.model.Story;
import net.atos.tenderingportal.domain.model.StoryMember;

import java.util.Optional;

/**
 * Mapper class for populating a StoryMemberDto.
 */
public class StoryMemberMapper {

    private StoryMapper storyMapper = new StoryMapper();

    /**
     * Maps a StoryMember to a StoryMemberDto, also mapping the Story instance within a StoryMember to a StoryDto
     * within the returned object.
     *
     * @param storyMember The StoryMember to map
     * @return A StoryMemberDto with the mapping
     */
    public StoryMemberDto mapStoryMemberToDto(StoryMember storyMember) {
        StoryMemberDto storyMemberDto = new StoryMemberDto();
        storyMemberDto.setStoryMemberId(storyMember.getStoryMemberId());
        storyMemberDto.setEmail(storyMember.getEmail());
        storyMemberDto.setRole(storyMember.getRole());

        Optional<Story> story = Optional.of(storyMember.getStory());
        story.ifPresent(theStory -> storyMemberDto.setStory(storyMapper.mapStoryToDto(theStory)));

        return storyMemberDto;
    }
}
