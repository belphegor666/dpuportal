package net.atos.tenderingportal.domain.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Data Transfer Object to hold selected fields of a Project and also its Sprints (and thus, the list of members for each Sprint).
 */
public class ProjectDto {

    private Long id;

    private String fundingType;

    // Property to be derived from Funding Type.
    private int priority;

    private String techStack;

    private String title;

    private String summary;

    private BigDecimal revenue;

    private BigDecimal margin;

    private BigDecimal costSavings;

    private float efficiency;

    private String costCode;

    private Date targetDate;

    private Date createdDate;

    private String projectType;

    private String maxBudget;

    private String projectCode;

    private String status;

    private String productOwner;

    private String documentUrl;

    private List<SprintDto> sprints = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFundingType() {
        return fundingType;
    }

    public void setFundingType(String fundingType) {
        this.fundingType = fundingType;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getTechStack() {
        return techStack;
    }

    public void setTechStack(String techStack) {
        this.techStack = techStack;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }

    public BigDecimal getMargin() {
        return margin;
    }

    public void setMargin(BigDecimal margin) {
        this.margin = margin;
    }

    public BigDecimal getCostSavings() {
        return costSavings;
    }

    public void setCostSavings(BigDecimal costSavings) {
        this.costSavings = costSavings;
    }

    public float getEfficiency() {
        return efficiency;
    }

    public void setEfficiency(float efficiency) {
        this.efficiency = efficiency;
    }

    public String getCostCode() {
        return costCode;
    }

    public void setCostCode(String costCode) {
        this.costCode = costCode;
    }

    public Date getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(Date targetDate) {
        this.targetDate = targetDate;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getProjectType() {
        return projectType;
    }

    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }

    public String getMaxBudget() {
        return maxBudget;
    }

    public void setMaxBudget(String maxBudget) {
        this.maxBudget = maxBudget;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProductOwner() {
        return productOwner;
    }

    public void setProductOwner(String productOwner) {
        this.productOwner = productOwner;
    }

    public String getDocumentUrl() { return documentUrl; }

    public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }

    public List<SprintDto> getSprints() {
        return sprints;
    }

    public void setSprints(List<SprintDto> sprints) {
        this.sprints = sprints;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectDto that = (ProjectDto) o;
        return Objects.equals(priority, that.priority) &&
                Objects.equals(efficiency, that.efficiency) &&
                Objects.equals(id, that.id) &&
                Objects.equals(fundingType, that.fundingType) &&
                Objects.equals(techStack, that.techStack) &&
                Objects.equals(title, that.title) &&
                Objects.equals(summary, that.summary) &&
                Objects.equals(revenue, that.revenue) &&
                Objects.equals(margin, that.margin) &&
                Objects.equals(costSavings, that.costSavings) &&
                Objects.equals(costCode, that.costCode) &&
                Objects.equals(targetDate, that.targetDate) &&
                Objects.equals(createdDate, that.createdDate) &&
                Objects.equals(projectType, that.projectType) &&
                Objects.equals(maxBudget, that.maxBudget) &&
                Objects.equals(projectCode, that.projectCode) &&
                Objects.equals(status, that.status) &&
                Objects.equals(productOwner, that.productOwner) &&
                Objects.equals(documentUrl, that.documentUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fundingType, priority, techStack, title, summary, revenue, margin, costSavings, efficiency, costCode, targetDate, createdDate, projectType, maxBudget, projectCode, status, productOwner, documentUrl);
    }
}
