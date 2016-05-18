package net.atos.tenderingportal.application.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.exception.OperationNotPermittedException;
import net.atos.tenderingportal.domain.model.Project;
import net.atos.tenderingportal.domain.service.ProjectService;
import play.db.ebean.Transactional;
import play.libs.Json;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

public class ProjectController extends BaseSecurityController {

    @Inject
    private ProjectService projectService;

    public Result createProject() {
        Project project = Json.fromJson(request().body().asJson(), Project.class);
        projectService.createProject(project, getUserId());

        return ok(Json.toJson(project));
    }

    public Result getProjects(Boolean currentSprint, Boolean productOwner) {
        List<ProjectDto> projects = projectService.getProjects(getUserId(), currentSprint, productOwner);
        return ok(Json.toJson(projects));
    }

    /**
     * Gets all projects that have a Sprint running on the selected date, and the team for that Sprint. (Note: The date
     * is passed as its Long representation because it is easier to do so when passing a date value over a GET request.)
     *
     * @param selectedDate The Long value representation of the date for which to look for all running Sprints
     * @return The retrieval result
     */
    public Result getProjectsWithTeams(Long selectedDate) {
        List<ProjectDto> projects = projectService.getProjectsWithTeams(new Date(selectedDate));
        return ok(Json.toJson(projects));
    }

    public Result cancelProject(Long id) {
        projectService.cancelProject(id);
        return ok();
    }

    @Transactional
    public Result updateProject() {
        Project project = Json.fromJson(request().body().asJson(), Project.class);
        try {
            projectService.updateProject(project, getUserId());
        } catch (OperationNotPermittedException exception) {
            return forbidden(exception.getMessage());
        }

        ObjectNode persistedProject = Json.newObject();
        persistedProject.put("id", project.getId());
        return ok(persistedProject);
    }

    public Result generateProjectTeamCSV(Long selectedDate){
        String csv = projectService.generateProjectTeamCsv(new Date());

        response().setContentType("application/csv");
        response().setHeader("Content-Disposition", "attachment; filename=\"members.csv\"");

        return ok(csv);
    }
}
