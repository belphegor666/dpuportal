package net.atos.tenderingportal.domain.dto;

import java.util.List;

/**
 * Created by a149635 on 10/12/2015.
 */
public class SprintUserDto {

    private Long id;

    private String surname;

    private String forename;

    private String email;

    private String jobTitle;

    private String role;

    private List<StoryMemberDto> storyAllocations;

    private List<CertificationDto> certifications;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getForename() {
        return forename;
    }

    public void setForename(String forename) {
        this.forename = forename;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<StoryMemberDto> getStoryAllocations() {
        return storyAllocations;
    }

    public void setStoryAllocations(List<StoryMemberDto> storyAllocations) {
        this.storyAllocations = storyAllocations;
    }

    public List<CertificationDto> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<CertificationDto> certifications) {
        this.certifications = certifications;
    }
}
