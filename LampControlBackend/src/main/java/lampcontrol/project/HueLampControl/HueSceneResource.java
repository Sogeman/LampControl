package lampcontrol.project.HueLampControl;

import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;


@Path("/scenes")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class HueSceneResource {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Inject
	private HueService hueService;
	
	@Context
	private UriInfo uriInfo;
	
	@POST
	@Transactional
	public Response create(HueScene scene) {
		entityManager.persist(scene);
		URI uri = uriInfo.getAbsolutePathBuilder().path(scene.getId().toString()).build();
		return Response.created(uri).build();
	}
	
	@GET
	public List<HueScene> getAllScenes() {
		return hueService.getAllScenes();
	}
	
	@GET
	@Path("/{id}")
	public HueScene retrieveScene(@PathParam("id") Long id) {
		return entityManager.find(HueScene.class, id);
	}
	
	@PUT
	@Path("/{id}")
	@Transactional
	public void updateScene(@PathParam("id") Long id, HueScene newScene) {
		HueScene oldScene = entityManager.find(HueScene.class, id);
		if(oldScene != null) {
			oldScene.setName(newScene.getName());
			oldScene.setLights(newScene.getLights());
		} else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}
	
	@DELETE
	@Path("/{id}")
	@Transactional
	public void deleteScene(@PathParam("id") Long id) {
		HueScene scene = entityManager.find(HueScene.class, id);
		if (scene != null) {
			entityManager.remove(scene);
		} else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}
}
