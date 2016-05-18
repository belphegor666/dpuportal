package net.atos.tenderingportal.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "story_member")
public class StoryMember {

    @Id
    @Column(name = "story_member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyMemberId;

    private String email;

    private String role;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "story_id", nullable = true)
    private Story story;

    public Long getStoryMemberId() {
        return storyMemberId;
    }

    public void setStoryMemberId(Long storyMemberId) {
        this.storyMemberId = storyMemberId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StoryMember that = (StoryMember) o;
        return Objects.equals(storyMemberId, that.storyMemberId) &&
                Objects.equals(email, that.email) &&
                Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(storyMemberId, email, role);
    }
}
