package net.atos.tenderingportal.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

public class Authentication {

    private String authToken;
    private Long subject;
    private String firstName;
    private String lastName;
    private String role;
    private String email;
    private String telephone;
    private String jobTitle;
    private String baseSite;
    private Date dateOfBirth;
    private String company;
    private String securityLevel;
    private String scRef;
    private Boolean banned;
    private String nationality;
    private String resetPasswordKey;
    private String homePagePreference;
    private String twitterUrl;
    private String linkedInUrl;

    @JsonIgnore
    private boolean authenticated;

    @JsonIgnore
    private boolean tokenExpired;

    @JsonIgnore
    private boolean accountLocked;

    public Authentication(String authToken, Long subject, boolean authenticated) {
        this.authToken = authToken;
        this.subject = subject;
        this.authenticated = authenticated;
    }

    public String getAuthToken() {
        return authToken;
    }

    public Long getSubject() {
        return subject;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public boolean isTokenExpired() {
        return tokenExpired;
    }

    public void setTokenExpired(boolean tokenExpired) {
        this.tokenExpired = tokenExpired;
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

    public String getRole() { return role; }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }

    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getJobTitle() { return jobTitle; }

    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getBaseSite() { return baseSite; }

    public void setBaseSite(String baseSite) { this.baseSite = baseSite; }

    public Date getDateOfBirth() { return dateOfBirth; }

    public void setDateOfBirth(Date dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getCompany() { return company; }

    public void setCompany(String company) { this.company = company; }

    public String getSecurityLevel() { return securityLevel; }

    public void setSecurityLevel(String securityLevel) { this.securityLevel = securityLevel; }

    public String getScRef() { return scRef; }

    public void setScRef(String scRef) { this.scRef = scRef; }

    public Boolean getBanned() { return banned; }

    public void setBanned(Boolean banned) { this.banned = banned; }

    public String getNationality() { return nationality; }

    public void setNationality(String nationality) { this.nationality = nationality; }

    public boolean isAccountLocked() {
        return accountLocked;
    }

    public void setAccountLocked(boolean accountLocked) {
        this.accountLocked = accountLocked;
    }

    public String getResetPasswordKey() { return resetPasswordKey; }

    public void setResetPasswordKey(String resetPasswordKey) { this.resetPasswordKey = resetPasswordKey; }

    public String getHomePagePreference() { return homePagePreference; }

    public void setHomePagePreference(String homePagePreference) { this.homePagePreference =  homePagePreference; }

    public String getTwitterUrl() { return twitterUrl; }

    public void setTwitterUrl(String twitterUrl) { this.twitterUrl =  twitterUrl; }

    public String getLinkedInUrl() { return linkedInUrl; }

    public void setLinkedInUrl(String linkedInUrl) { this.linkedInUrl =  linkedInUrl; }
}
