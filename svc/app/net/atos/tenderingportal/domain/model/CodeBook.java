package net.atos.tenderingportal.domain.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "code_book")
public class CodeBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    @Column(name = "lookup_code", nullable = false)
    private String lookupCode;

    @Column(nullable = false)
    private String description;

    @Column(name = "short_desc")
    private String shortDesc;

    @Column(name = "display_order")
    private Integer displayOrder;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLookupCode() {
        return lookupCode;
    }

    public void setLookupCode(String lookupCode) {
        this.lookupCode = lookupCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CodeBook codeBook = (CodeBook) o;
        return Objects.equals(displayOrder, codeBook.displayOrder) &&
                Objects.equals(id, codeBook.id) &&
                Objects.equals(type, codeBook.type) &&
                Objects.equals(lookupCode, codeBook.lookupCode) &&
                Objects.equals(description, codeBook.description) &&
                Objects.equals(shortDesc, codeBook.shortDesc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, lookupCode, description, shortDesc, displayOrder);
    }
}
