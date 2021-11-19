package com.codegym.service.table;

import com.codegym.entity.Desk;
import com.codegym.repository.TablesRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class DeskService implements IDeskService {
    @Autowired
    TablesRepository tablesRepository;
    @Override
    public Iterable<Desk> findAll() {
        return tablesRepository.findAll();
    }

    @Override
    public Optional<Desk> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Desk save(Desk desk) {
        return tablesRepository.save(desk);
    }

    @Override
    public void remove(Long id) {

    }
}
