package net.atos.tenderingportal.domain.repository;


import net.atos.tenderingportal.domain.model.Project;

import java.util.List;

public interface ProjectRepository extends GenericRepository<Long, Project>{

    List<Project> findAllByUserId(Long userId);
    List<Project> findAllByProductOwner(String email);
    List<Project> findAllWithCurrentSprint();
    List<Project> findAll();
}
