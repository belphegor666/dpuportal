package net.atos.tenderingportal.domain.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table (name = "sprint_user")
public class SprintUser {

    @EmbeddedId
    private SprintUserPK id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn (name = "sprint_id", referencedColumnName = "sprint_id", insertable = false, updatable = false)
    private Sprint sprint;

    @ManyToOne
    @JoinColumn (name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false)
    private User user;

    @Column
    private String role;

    public SprintUserPK getId() {
        return id;
    }

    public void setId(SprintUserPK id) {
        this.id = id;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SprintUser that = (SprintUser) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(sprint, that.sprint) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sprint, user);
    }
}
