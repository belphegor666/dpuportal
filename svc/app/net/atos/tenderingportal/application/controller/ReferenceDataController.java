package net.atos.tenderingportal.application.controller;


import net.atos.tenderingportal.domain.service.ReferenceDataService;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class ReferenceDataController extends Controller{

    private ReferenceDataService referenceDataService;

    @Inject
    public ReferenceDataController(ReferenceDataService referenceDataService) {
        this.referenceDataService = referenceDataService;
    }

    public Result getCodeBook(){
        return ok(Json.toJson(referenceDataService.getCodeBook()));
    }
}
