package net.atos.tenderingportal.application.controller;

import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.dto.StoryDto;
import net.atos.tenderingportal.domain.enums.HomePagePreference;
import net.atos.tenderingportal.domain.model.Certification;
import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.service.CertificationService;
import net.atos.tenderingportal.domain.service.UserService;
import play.db.ebean.Transactional;
import play.libs.Json;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.List;

public class UserController extends BaseSecurityController {

    private UserService userService;

    private CertificationService certificationService;

    @Inject
    public UserController(UserService userService, CertificationService certificationService) {

        this.userService = userService;
        this.certificationService = certificationService;
    }

    @Transactional
         public Result findProjectsAssignedToUser(final Long userId){
        List<ProjectDto> assignedProjects = userService.findProjectsAssignedToUser(userId);
        return ok(Json.toJson(assignedProjects));
    }

    @Transactional
    public Result findUserCertifications(final Long userId){
        List<Certification> certifications = certificationService.findUserCertifications(userId);
        return ok(Json.toJson(certifications));
    }

    public Result createUserCertification(final Long userId) {
        Certification certification = Json.fromJson(request().body().asJson(), Certification.class);
        certificationService.createCertification(certification, userId);
        return ok(Json.toJson(certification));
    }

    @Transactional
    public Result findStoriesAssignedToUser(final Long userId){
        List<StoryDto> assignedStories = userService.findStoriesAssignedToUser(userId);
        return ok(Json.toJson(assignedStories));
    }



    /**
     * Change the user account details
     *
     * @return the result of the change
     */
    public Result editAccountDetails() {
        User newUserDetails = Json.fromJson(request().body().asJson(), User.class);
        userService.editAccountDetails(newUserDetails);
        return ok("Account Details Succesfully Changed");
    }

    /**
     * Saves the user preference
     *
     * @return A success message
     */
    public Result saveUserPreference() {
        User user = Json.fromJson(request().body().asJson(), User.class);
        userService.saveHomePagePreference(HomePagePreference.statusOf(user.getHomePagePreference().toString()), user.getUserId());
        return ok();
    }

}
