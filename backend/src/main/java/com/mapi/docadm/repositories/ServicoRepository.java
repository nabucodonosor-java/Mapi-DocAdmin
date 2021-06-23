package com.mapi.docadm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.dto.ServicoSuccessDto;
import com.mapi.docadm.dto.ServicoTotalServicosDto;
import com.mapi.docadm.entities.Servico;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
	
	@Query("SELECT new com.mapi.docadm.dto.ServicoSuccessDto(obj.funcionario, SUM(obj.qtdeServico), SUM(obj.qtdeFinalizado)) "
			+ " FROM Servico AS obj GROUP BY obj.funcionario")
	List<ServicoSuccessDto> sucessGroupedByFuncionario();
	
	@Query("SELECT new com.mapi.docadm.dto.ServicoTotalServicosDto(obj.funcionario, SUM(obj.qtdeServico)) "
			+ " FROM Servico AS obj GROUP BY obj.funcionario")
	List<ServicoTotalServicosDto> totalServicoGroupedByFuncionario();

}
