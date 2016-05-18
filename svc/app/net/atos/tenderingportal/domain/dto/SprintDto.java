package net.atos.tenderingportal.domain.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by a149635 on 10/12/2015.
 */
public class SprintDto {
    private Long sprintId;

    private int sprintNo;

    private Long projectId;

    private String title;

    private Date startDate;

    private Date endDate;

    private String description;

    private String status;

    private List<SprintUserDto> members = new ArrayList<>();

    public Long getSprintId() {
        return sprintId;
    }

    public void setSprintId(Long sprintId) {
        this.sprintId = sprintId;
    }

    public int getSprintNo() {
        return sprintNo;
    }

    public void setSprintNo(int sprintNo) {
        this.sprintNo = sprintNo;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<SprintUserDto> getMembers() {
        return members;
    }

    public void setMembers(List<SprintUserDto> members) {
        this.members = members;
    }
}
