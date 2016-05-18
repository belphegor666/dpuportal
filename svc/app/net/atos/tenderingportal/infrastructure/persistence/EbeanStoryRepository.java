package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.dto.StoryDto;
import net.atos.tenderingportal.domain.model.Project;
import net.atos.tenderingportal.domain.model.Sprint;
import net.atos.tenderingportal.domain.model.Story;
import net.atos.tenderingportal.domain.repository.StoryRepository;
import net.atos.tenderingportal.domain.util.StoryMapper;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EbeanStoryRepository extends EbeanGenericRepository<Long, Story> implements StoryRepository {

    @Override
    Class<Story> getTClass() {
        return Story.class;
    }

    @Override
    public List<Story> findAllBySprint(Long sprintId) {
        return FINDER.where().eq("sprint.sprintId", sprintId).findList();
    }

   @Override
    public List<StoryDto> findCurrentStoriesAssignedToUser(String email) {
       Date now = new Date();
       List<Story> userStories = FINDER.where().le("sprint.startDate", DateFormatUtils.format(now, "yyyy-MM-dd"))
               .ge("sprint.endDate", DateFormatUtils.format(now, "yyyy-MM-dd")).eq("storyMembers.email", email)
               .findList();

       List<StoryDto> assignedStories = new ArrayList<>();
       StoryMapper storyMapper = new StoryMapper();

       for (Story story : userStories) {

           Sprint sprint = story.getSprint();
           Project project = sprint.getProject();
           StoryDto storyDto = storyMapper.mapStoryToDto(story);

           storyDto.setProjectTitle(project.getTitle());
           if (!assignedStories.contains(storyDto)) {
               assignedStories.add(storyDto);
           }

       }

       return assignedStories;
   }


}