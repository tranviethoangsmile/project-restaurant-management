package com.codegym.service.desk;

import com.codegym.entity.Desk;
import com.codegym.repository.DeskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


public class DeskService implements IDeskService {
    @Autowired
    DeskRepository deskRepository;
    @Override
    public Iterable<Desk> findAll() {
        return deskRepository.findAll();
    }

    @Override
    public Optional<Desk> findById(Long id) {
       return deskRepository.findById(id);
    }

    @Override
    public Desk save(Desk desk) {
        return deskRepository.save(desk);
    }

    @Override
    public void remove(Long id) {
        deskRepository.deleteById(id);
    }
}
