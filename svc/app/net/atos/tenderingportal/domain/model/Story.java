package net.atos.tenderingportal.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "story")
public class Story {

    @Id
    @Column(name = "story_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyId;

    @Column
    private String epic;

    @Column(name = "story_details")
    private String storyDetails;

    @Column(name = "trello_link")
    private String trelloLink;

    @Column(name = "story_points")
    private String storyPoints;

    private String priority;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "created_by")
    private String createdBy;

    @Column
    private String status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "sprint_id", nullable = false)
    private Sprint sprint;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    private List<StoryMember> storyMembers;

    public List<StoryMember> getStoryMembers() {
        return storyMembers;
    }

    public void setStoryMembers(List<StoryMember> storyMembers) {
        this.storyMembers = storyMembers;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Story story = (Story) o;
        return Objects.equals(storyId, story.storyId) &&
                Objects.equals(epic, story.epic) &&
                Objects.equals(storyDetails, story.storyDetails) &&
                Objects.equals(trelloLink, story.trelloLink) &&
                Objects.equals(storyPoints, story.storyPoints) &&
                Objects.equals(priority, story.priority) &&
                Objects.equals(assignedTo, story.assignedTo) &&
                Objects.equals(createdBy, story.createdBy) &&
                Objects.equals(status, story.status) &&
                Objects.equals(storyMembers, story.storyMembers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(storyId, epic, storyDetails, trelloLink, storyPoints, priority, assignedTo, createdBy, status, storyMembers);
    }
}
