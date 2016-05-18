package net.atos.tenderingportal.domain.util;

import net.atos.tenderingportal.domain.dto.StoryDto;
import net.atos.tenderingportal.domain.dto.StoryMemberDto;
import net.atos.tenderingportal.domain.model.Story;
import net.atos.tenderingportal.domain.model.StoryMember;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by a149635 on 10/12/2015.
 */
public class StoryMapper {

    public StoryDto mapStoryToDto(Story story) {
        StoryDto storyDto = new StoryDto();
        storyDto.setStoryId(story.getStoryId());
        storyDto.setEpic(story.getEpic());
        storyDto.setStoryDetails(story.getStoryDetails());
        storyDto.setTrelloLink(story.getTrelloLink());
        storyDto.setAssignedTo(story.getAssignedTo());
        storyDto.setCreatedBy(story.getCreatedBy());
        storyDto.setPriority(story.getPriority());
        storyDto.setStatus(story.getStatus());
        storyDto.setStoryPoints(story.getStoryPoints());
        StoryMemberDto memberDto = new StoryMemberDto();

        List<StoryMemberDto> storyMembers = story.getStoryMembers().stream()
                .map(mapStoryMemberToDto)
                .collect(Collectors.<StoryMemberDto>toList());

        storyDto.setStoryMembers(storyMembers);

        return storyDto;
    }


    Function<StoryMember, StoryMemberDto> mapStoryMemberToDto
            = new Function<StoryMember, StoryMemberDto>() {

        public StoryMemberDto apply(StoryMember t) {
            StoryMemberDto memberDto = new StoryMemberDto();
            memberDto.setEmail(t.getEmail());
            memberDto.setRole(t.getRole());
            memberDto.setStoryMemberId(t.getStoryMemberId());
            return memberDto;
        }
    };


}
