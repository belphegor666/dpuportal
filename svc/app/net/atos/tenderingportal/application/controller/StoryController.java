package net.atos.tenderingportal.application.controller;

import net.atos.tenderingportal.domain.dto.StoryDto;
import net.atos.tenderingportal.domain.model.Story;
import net.atos.tenderingportal.domain.repository.StoryRepository;
import net.atos.tenderingportal.domain.service.StoryService;
import play.libs.Json;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.List;
import java.util.Objects;

public class StoryController extends BaseSecurityController {

    private StoryService storyService;

    private StoryRepository storyRepository;

    @Inject
    public void setStoryService(StoryService storyService) {
        this.storyService = storyService;
    }

    @Inject
    public void setStoryRepository(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    public Result getAllStoriesForSprint(Long sprintId) {
        List<Story> stories = storyService.getAllStoriesForSprint(sprintId);
        return ok(Json.toJson(stories));
    }

    public Result createStory(Long sprintId) {
        Story story = Json.fromJson(request().body().asJson(), Story.class);
        storyService.createStory(sprintId, story);
        return ok("Successfully created story");
    }

    public Result updateStory(Long sprintId) {
        Story story = Json.fromJson(request().body().asJson(), Story.class);
        storyService.updateStory(sprintId, story);
        return ok("Successfully created story");
    }

    public Result deleteStory(Long storyId) {
        storyService.deleteStory(storyId);
        return ok("Successfully deleted story");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StoryController that = (StoryController) o;
        return Objects.equals(storyService, that.storyService) &&
                Objects.equals(storyRepository, that.storyRepository);
    }

    @Override
    public int hashCode() {
        return Objects.hash(storyService, storyRepository);
    }
}
