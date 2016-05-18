package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.dto.StoryDto;
import net.atos.tenderingportal.domain.model.Sprint;
import net.atos.tenderingportal.domain.model.Story;
import net.atos.tenderingportal.domain.model.StoryMember;
import net.atos.tenderingportal.domain.repository.SprintRepository;
import net.atos.tenderingportal.domain.repository.StoryMemberRepository;
import net.atos.tenderingportal.domain.repository.StoryRepository;
import net.atos.tenderingportal.domain.repository.UserRepository;
import net.atos.tenderingportal.domain.util.StoryMapper;

import javax.inject.Inject;
import java.util.List;

public class StoryService {

    private StoryRepository storyRepository;
    private SprintRepository sprintRepository;
    private StoryMemberRepository storyMemberRepository;
    private UserRepository userRepository;

    @Inject
    public StoryService(StoryRepository storyRepository, UserRepository userRepository, SprintRepository sprintRepository, StoryMemberRepository storyMemberRepository) {
        this.storyRepository = storyRepository;
        this.sprintRepository = sprintRepository;
        this.storyMemberRepository = storyMemberRepository;
        this.userRepository = userRepository;
    }

    public List<Story> getAllStoriesForSprint(Long sprintId){
        List<Story> storyList = storyRepository.findAllBySprint(sprintId);
         return storyList;
    }

    public void createStory(Long sprintId, Story story) {
        Sprint sprint = sprintRepository.findById(sprintId);
        story.setSprint(sprint);
        storyRepository.save(story);
    }

    public void updateStory(Long sprintId, Story story) {
        storyRepository.update(story);

        List<StoryMember> storyMemberList = story.getStoryMembers();
        List<StoryMember> storedStoryMemberList = storyMemberRepository.getMembersOfStory(story.getStoryId());

        for(StoryMember storyMember : storedStoryMemberList) {
            if (!storyMemberList.contains(storyMember)) {
                storyMemberRepository.delete(storyMember.getStoryMemberId());
            }
        }
    }

    public void deleteStory(Long storyId) {
        storyRepository.delete(storyId);
    }

    private StoryDto mapStory(Story story) {
        StoryMapper storyMapper = new StoryMapper();
        return storyMapper.mapStoryToDto(story);
    }


}