package net.atos.tenderingportal.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.atos.tenderingportal.domain.enums.ProjectStatus;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table (name = "project")
public class Project {

    @Id
    @Column(name = "project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Constraints.Required
    private String title;

    @Column (nullable = false)
    @Constraints.Required
    private String summary;

    @Column (name = "additional_information")
    private String additionalInformation;

    @Column(name = "revenue")
    private BigDecimal revenue;

    @Column(name = "margin")
    private BigDecimal margin;

    @Column(name = "cost_savings")
    private BigDecimal costSavings;

    @Column(name = "efficiency")
    private float efficiency;

    @Column(name = "cost_code")
    private String costCode;

    //@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ssZ")
    @Column(name = "target_date")
    private Date targetDate;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(length = 100)
    private String status;

    @Column(name = "project_type")
    private String projectType;

    @Column(name = "funding_type")
    private String fundingType;

    @Column(name = "max_budget")
    private String maxBudget;

    @Column(name = "tech_stack")
    private String techStack;

    @Column(name = "product_owner")
    private String productOwner;

    @Column(name = "approved_by")
    private Long approvedBy;

    @Column(name = "project_code")
    private String projectCode;

    @Column(name = "document_url")
    private String documentUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    private List<Sprint> sprints;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProjectType() {
        return projectType;
    }

    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }

    public String getFundingType() {
        return fundingType;
    }

    public void setFundingType(String fundingType) {
        this.fundingType = fundingType;
    }

    public String getMaxBudget() {
        return maxBudget;
    }

    public void setMaxBudget(String maxBudget) {
        this.maxBudget = maxBudget;
    }

    public String getTechStack() {
        return techStack;
    }

    public void setTechStack(String techStack) {
        this.techStack = techStack;
    }

    public String getProductOwner() {
        return productOwner;
    }

    public void setProductOwner(String productOwner) {
        this.productOwner = productOwner;
    }

    public Long getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Long approvedBy) {
        this.approvedBy = approvedBy;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getProjectCode() {
        if (projectCode != null && !projectCode.isEmpty()) {
            projectCode = String.format("%1$" + 3 + "s", projectCode).replace(' ', '0');
        }
        return projectCode; }

    public void setProjectCode(String projectCode) { this.projectCode = projectCode; }

    public List<Sprint> getSprints() {
        return sprints;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    public void setSprints(List<Sprint> sprints) {
        this.sprints = sprints;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(efficiency, project.efficiency) &&
                Objects.equals(id, project.id) &&
                Objects.equals(title, project.title) &&
                Objects.equals(summary, project.summary) &&
                Objects.equals(additionalInformation, project.additionalInformation) &&
                Objects.equals(revenue, project.revenue) &&
                Objects.equals(margin, project.margin) &&
                Objects.equals(costSavings, project.costSavings) &&
                Objects.equals(costCode, project.costCode) &&
                Objects.equals(targetDate, project.targetDate) &&
                Objects.equals(createdDate, project.createdDate) &&
                Objects.equals(status, project.status) &&
                Objects.equals(projectType, project.projectType) &&
                Objects.equals(fundingType, project.fundingType) &&
                Objects.equals(maxBudget, project.maxBudget) &&
                Objects.equals(techStack, project.techStack) &&
                Objects.equals(productOwner, project.productOwner) &&
                Objects.equals(approvedBy, project.approvedBy) &&
                Objects.equals(projectCode, project.projectCode) &&
                Objects.equals(documentUrl, project.documentUrl) &&
                Objects.equals(user, project.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, summary, additionalInformation, revenue, margin, costSavings, efficiency, costCode, targetDate, createdDate, status, projectType, fundingType, maxBudget, techStack, productOwner, approvedBy, projectCode, documentUrl, user);
    }
}

