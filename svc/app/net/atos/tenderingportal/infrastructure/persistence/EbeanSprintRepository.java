package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.Sprint;

import net.atos.tenderingportal.domain.repository.SprintRepository;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class EbeanSprintRepository extends EbeanGenericRepository<Long, Sprint> implements SprintRepository {

    @Override
    Class<Sprint> getTClass() {
        return Sprint.class;
    }

    @Override
    public List<Sprint> findAllByProject(Long projectId) {
        return FINDER.where().eq("project.id", projectId).findList();
    }

    @Override
    public List<Sprint> findActiveSprintsByDate(Date date) {
        return FINDER.where().le("startDate", formattedDate(date))
                .ge("endDate", formattedDate(date))
                .findList();
    }

    /**
     * Formats a date to ISO format so it can be used in comparisons.
     *
     * @param date The date to format
     * @return The date in ISO format
     */
    private Date formattedDate(Date date){
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
            String dateString = df.format(date);
            return df.parse(dateString);
        } catch (ParseException pe) {
            pe.printStackTrace();
        }

        return null;
    }
}