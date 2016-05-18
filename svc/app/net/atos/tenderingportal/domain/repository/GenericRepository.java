package net.atos.tenderingportal.domain.repository;

/**
 * Created by koolrich on 21/09/15.
 */
public interface GenericRepository <ID, T> {

    void save(T t);

    public T findById(ID id);

    void delete(ID id);

    void update(T t);
}
