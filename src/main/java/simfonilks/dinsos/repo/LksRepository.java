/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.repo;


import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import simfonilks.dinsos.model.Lks;
import simfonilks.dinsos.model.User;

/**
 *
 * @author hamam
 */
@Repository
public interface LksRepository extends JpaRepository<Lks, Long> {
    List<Lks> findByUser(User user); 
}
