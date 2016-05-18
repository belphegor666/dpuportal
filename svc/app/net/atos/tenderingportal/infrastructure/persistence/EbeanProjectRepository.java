package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.Project;
import net.atos.tenderingportal.domain.repository.ProjectRepository;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.util.Date;
import java.util.List;


public class EbeanProjectRepository extends EbeanGenericRepository<Long, Project> implements ProjectRepository {



    @Override
    Class<Project> getTClass() {
        return Project.class;
    }

    @Override
    public List<Project> findAllByUserId(Long userId) {
        return FINDER.where().eq("user.userId", userId).findList();
    }

    @Override
    public List<Project> findAllByProductOwner(String userEmail) {
        return FINDER.where().eq("productOwner", userEmail).findList();
    }

    @Override
    public List<Project> findAll() {
        return FINDER.all();
    }

    @Override
    public List<Project> findAllWithCurrentSprint() {
        Date now = new Date();
        return FINDER.fetch("sprints").where().le("sprints.startDate", DateFormatUtils.format(now, "yyyy-MM-dd"))
                .ge("sprints.endDate", DateFormatUtils.format(now, "yyyy-MM-dd"))
                .findList();
    }
}
