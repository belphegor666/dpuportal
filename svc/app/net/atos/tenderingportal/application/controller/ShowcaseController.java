package net.atos.tenderingportal.application.controller;

import net.atos.tenderingportal.domain.model.Showcase;
import net.atos.tenderingportal.domain.service.ShowcaseService;
import play.libs.Json;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.List;

public class ShowcaseController extends BaseSecurityController {

    private ShowcaseService showcaseService;

    @Inject
    public ShowcaseController(ShowcaseService showcaseService) {
        this.showcaseService = showcaseService;
    }

    public Result getAllShowcases() {
        List<Showcase> showcases = showcaseService.getAllShowcases();
        return ok(Json.toJson(showcases));
    }
}
