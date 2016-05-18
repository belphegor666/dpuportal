package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.model.*;
import net.atos.tenderingportal.domain.repository.SprintUserRepository;

import javax.inject.Inject;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SprintUserService {

    private SprintUserRepository sprintUserRepository;

    private SprintService sprintService;

    @Inject
    public void setSprintService(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    @Inject
    public void setSprintUserRepository(SprintUserRepository sprintUserRepository) {
        this.sprintUserRepository = sprintUserRepository;
    }

    private Date formattedDate(Date d){
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
            String dateString = df.format(d);
            Date formattedDate = df.parse(dateString);
            return formattedDate;
        } catch (Exception e){

        }

        return null;
    }

}