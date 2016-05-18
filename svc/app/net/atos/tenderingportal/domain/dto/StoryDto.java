package net.atos.tenderingportal.domain.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by a149635 on 10/12/2015.
 */
public class StoryDto {

    private Long storyId;

    private String epic;

    private String storyDetails;

    private String trelloLink;

    private String storyPoints;

    private String priority;

    private String assignedTo;

    private String createdBy;

    private String status;

    private List<StoryMemberDto> storyMembers = new ArrayList<>();

    private String projectTitle;

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public List<StoryMemberDto> getStoryMembers() {
        return storyMembers;
    }

    public void setStoryMembers(List<StoryMemberDto> storyMembers) {
        this.storyMembers = storyMembers;
    }

    public Long getStoryId() {
        return storyId;
    }

    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }

    public String getEpic() {
        return epic;
    }

    public void setEpic(String epic) {
        this.epic = epic;
    }

    public String getStoryDetails() {
        return storyDetails;
    }

    public void setStoryDetails(String storyDetails) {
        this.storyDetails = storyDetails;
    }

    public String getTrelloLink() {
        return trelloLink;
    }

    public void setTrelloLink(String trelloLink) {
        this.trelloLink = trelloLink;
    }

    public String getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(String storyPoints) {
        this.storyPoints = storyPoints;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
