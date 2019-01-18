package lampcontrol.project.HueLampControl;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class HueService {

	@PersistenceContext
	private EntityManager entityManager;

	public List<HueScene> getAllScenes() {
		return entityManager.createNamedQuery("scene.selectAll", HueScene.class).getResultList();
	}
}
