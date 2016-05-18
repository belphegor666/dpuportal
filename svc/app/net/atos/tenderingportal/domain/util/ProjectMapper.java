package net.atos.tenderingportal.domain.util;

import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.enums.FundingType;
import net.atos.tenderingportal.domain.model.Project;

/**
 * Mapper class for populating a ProjectDto.
 */
public class ProjectMapper {

    /**
     * Maps a Project to a ProjectDto.
     *
     * @param project The Project to map
     * @return A ProjectDto with the mapping
     */
    public ProjectDto mapProjectToDto(Project project) {
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setTitle(project.getTitle());
        projectDto.setSummary(project.getSummary());
        projectDto.setRevenue(project.getRevenue());
        projectDto.setMargin(project.getMargin());
        projectDto.setCostSavings(project.getCostSavings());
        projectDto.setEfficiency(project.getEfficiency());
        projectDto.setCostCode(project.getCostCode());
        projectDto.setTargetDate(project.getTargetDate());
        projectDto.setCreatedDate(project.getCreatedDate());
        projectDto.setProjectType(project.getProjectType());
        projectDto.setFundingType(project.getFundingType());
        projectDto.setMaxBudget(project.getMaxBudget());
        projectDto.setProjectCode(project.getProjectCode());
        setPriority(projectDto);
        projectDto.setTechStack(project.getTechStack());

        projectDto.setStatus(project.getStatus());
        projectDto.setProductOwner(project.getProductOwner());
        projectDto.setDocumentUrl(project.getDocumentUrl());
        return projectDto;
    }

    /**
     * Sets the priority of a project based on its funding type (see {@link FundingType}).
     *
     * @param projectDto The Project DTO on which to set the priority
     */
    private void setPriority(ProjectDto projectDto) {
        String funding = projectDto.getFundingType();

        if (funding == null) {
            projectDto.setPriority(3);
        } else {
            FundingType fundingType = FundingType.typeOf(funding);

            switch (fundingType) {
                case CLIENT_FUNDED: projectDto.setPriority(1);
                    break;
                case INTERNALLY_FUNDED: projectDto.setPriority(2);
                    break;
                case NO_FUNDING: projectDto.setPriority(3);
                    break;
                default: projectDto.setPriority(3);
            }
        }
    }
}
