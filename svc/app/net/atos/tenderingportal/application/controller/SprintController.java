package net.atos.tenderingportal.application.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import net.atos.tenderingportal.domain.dto.SprintDto;
import net.atos.tenderingportal.domain.model.Sprint;
import net.atos.tenderingportal.domain.repository.SprintRepository;
import net.atos.tenderingportal.domain.service.SprintService;
import play.db.ebean.Transactional;
import play.libs.Json;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.List;

public class SprintController extends BaseSecurityController {

    private SprintService sprintService;

    private SprintRepository sprintRepository;

    @Inject
    public void setSprintService(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    @Inject
    public void setSprintRepository(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    @Transactional
    public Result createSprintForProject(Long projectId) {
        Sprint sprint = Json.fromJson(request().body().asJson(), Sprint.class);
        sprintService.createSprintForProject(projectId, sprint);
        ObjectNode persistedSprint = Json.newObject();
        persistedSprint.put("id", sprint.getSprintId());
        return ok(persistedSprint);
    }

    public Result getAllSprintsForProject(Long projectId) {
        List<SprintDto> sprints = sprintService.getAllSprintsForProject(projectId);
        return ok(Json.toJson(sprints));
    }

    @Transactional
    public Result updateSprint() {
        Sprint sprint = Json.fromJson(request().body().asJson(), Sprint.class);
        sprintRepository.update(sprint);
        return ok();
    }

    @Transactional
    public Result addMemberToSprint(Long sprintId) {
        JsonNode json = request().body().asJson();
        String role = json.findPath("role").textValue();
        sprintService.addMemberToSprint(getUserId(), sprintId, role);
        return ok("Added member to sprint");
    }

    @Transactional
    public Result removeMemberFromSprint(Long sprintId) {
        sprintService.removeMemberFromSprint(getUserId(), sprintId);
        return ok("Removed member from sprint");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SprintController)) return false;

        SprintController that = (SprintController) o;

        if (!sprintService.equals(that.sprintService)) return false;
        return sprintRepository.equals(that.sprintRepository);

    }

    @Override
    public int hashCode() {
        int result = sprintService.hashCode();
        result = 31 * result + sprintRepository.hashCode();
        return result;
    }
}
