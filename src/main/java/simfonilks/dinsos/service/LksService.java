/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simfonilks.dinsos.model.Lks;
import simfonilks.dinsos.model.User;
import simfonilks.dinsos.repo.LksRepository;

/**
 *
 * @author hamam
 */
@Service
public class LksService {

    @Autowired
    private LksRepository lksRepository;

    public Lks saveLks(Lks lks) {
        return lksRepository.save(lks);
    }

    public List<Lks> getAllLks() {
        return lksRepository.findAll();
    }

    public Optional<Lks> getLksById(Long id) {
        return lksRepository.findById(id);
    }
    
    public List<Lks> getLksByUser(User user) {
        return lksRepository.findByUser(user);
    }

    public void deleteLks(Long id) {
        lksRepository.deleteById(id);
    }
}
