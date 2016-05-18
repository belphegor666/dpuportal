package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.dto.StoryDto;
import net.atos.tenderingportal.domain.model.Story;

import java.util.List;

public interface StoryRepository extends GenericRepository<Long, Story> {

    List<Story> findAllBySprint(Long sprintId);

    List<StoryDto> findCurrentStoriesAssignedToUser(String email);
}