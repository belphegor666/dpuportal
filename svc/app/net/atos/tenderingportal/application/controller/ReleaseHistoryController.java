package net.atos.tenderingportal.application.controller;

import net.atos.tenderingportal.domain.model.ReleaseHistory;
import net.atos.tenderingportal.domain.service.ReleaseHistoryService;
import play.libs.Json;
import play.mvc.Result;


import javax.inject.Inject;
import java.util.List;

public class ReleaseHistoryController extends BaseSecurityController{

    private ReleaseHistoryService releaseHistoryService;

    @Inject
    public ReleaseHistoryController(ReleaseHistoryService releaseHistoryService) {
        this.releaseHistoryService = releaseHistoryService;
    }

    public Result listAll(){
        List<ReleaseHistory> releaseHistories = releaseHistoryService.listAll();
        return ok(Json.toJson(releaseHistories));
    }
}
