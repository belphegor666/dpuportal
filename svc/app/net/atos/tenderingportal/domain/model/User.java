package net.atos.tenderingportal.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.atos.tenderingportal.domain.enums.HomePagePreference;
import net.atos.tenderingportal.domain.enums.SystemRole;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Created by koolrich on 20/09/15.
 */
@Entity
@Table (name = "user")
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 50)
    private String title;

    @Column (name = "first_name", length = 50, nullable = false)
    @Constraints.Required
    @Constraints.MaxLength(50)
    private String firstName;

    @Column (name = "last_name", length = 50, nullable = false)
    @Constraints.Required
    @Constraints.MaxLength(50)
    private String lastName;

    @Column(length = 20)
    private String telephone;

    @Constraints.Email
    @Constraints.MaxLength(100)
    @Constraints.Required
    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "activation_key")
    private String activationKey;

    @Column(name = "job_title", length = 100)
    private String jobTitle;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private SystemRole role;

    @Column
    private boolean activated = false;

    @Column(name = "reset_password_key")
    private String resetPasswordKey;

    @Enumerated(EnumType.STRING)
    @Column(name = "home_page_preference")
    private HomePagePreference homePagePreference;

    @Column(name = "twitter_url")
    private String twitterUrl;

    @Column(name = "linked_in_url")
    private String linkedInUrl;

    @Column(name = "created_date")
    private Date createdDate;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Certification> certifications;

    public User() {
    }

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    

    public void setCertifications(List<Certification> certifications) {
        this.certifications = certifications;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public SystemRole getRole() { return role; }

    public void setRole(SystemRole role) { this.role = role; }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getResetPasswordKey() {
        return resetPasswordKey;
    }

    public void setResetPasswordKey(String resetPasswordKey) {
        this.resetPasswordKey = resetPasswordKey;
    }

    public HomePagePreference getHomePagePreference() { return homePagePreference; }

    public void setHomePagePreference(HomePagePreference homePagePreference) { this.homePagePreference = homePagePreference; }

    public String getTwitterUrl() { return twitterUrl; }

    public void setTwitterUrl(String twitterUrl) { this.twitterUrl = twitterUrl; }

    public String getLinkedInUrl() { return linkedInUrl; }

    public void setLinkedInUrl(String linkedInUrl) { this.linkedInUrl = linkedInUrl; }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(activated, user.activated) &&
                Objects.equals(userId, user.userId) &&
                Objects.equals(title, user.title) &&
                Objects.equals(firstName, user.firstName) &&
                Objects.equals(lastName, user.lastName) &&
                Objects.equals(telephone, user.telephone) &&
                Objects.equals(email, user.email) &&
                Objects.equals(password, user.password) &&
                Objects.equals(activationKey, user.activationKey) &&
                Objects.equals(jobTitle, user.jobTitle) &&
                Objects.equals(role, user.role) &&
                Objects.equals(resetPasswordKey, user.resetPasswordKey) &&
                Objects.equals(homePagePreference, user.homePagePreference) &&
                Objects.equals(twitterUrl, user.twitterUrl) &&
                Objects.equals(linkedInUrl, user.linkedInUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, title, firstName, lastName, telephone, email, password, activationKey, jobTitle, role, activated, resetPasswordKey, homePagePreference, twitterUrl, linkedInUrl);
    }
}
