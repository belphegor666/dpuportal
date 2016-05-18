package net.atos.tenderingportal.domain.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table (name = "showcase")
public class Showcase {

    @Id
    @Column(name = "showcase_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showcaseId;

    @Column
    private String title;

    @Column
    private String description;

    @Column(name = "page_url")
    private String pageUrl;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "media_url")
    private String mediaUrl;

    @Column
    private String category;

    @Column(name = "project_code")
    private String projectCode;

    public Long getShowcaseId() {
        return showcaseId;
    }

    public void setShowcaseId(Long showcaseId) {
        this.showcaseId = showcaseId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Showcase that = (Showcase) o;
        return Objects.equals(showcaseId, that.showcaseId) &&
                Objects.equals(title, that.title) &&
                Objects.equals(description, that.description) &&
                Objects.equals(pageUrl, that.pageUrl) &&
                Objects.equals(imageUrl, that.imageUrl) &&
                Objects.equals(mediaUrl, that.mediaUrl) &&
                Objects.equals(category, that.category) &&
                Objects.equals(projectCode, that.projectCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(showcaseId, title, description, pageUrl, imageUrl, mediaUrl, category, projectCode);
    }
}
