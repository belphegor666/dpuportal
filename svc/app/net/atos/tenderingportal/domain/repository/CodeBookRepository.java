package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.model.CodeBook;

import java.util.List;

public interface CodeBookRepository extends GenericRepository<Long, CodeBook> {

    List<CodeBook> findAll();
}
