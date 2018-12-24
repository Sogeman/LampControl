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
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response.Status;

@Path("/rooms")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class HueRoomResource {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Inject
	private HueService hueService;
	
	@Context
	private UriInfo uriInfo;
	
	
	@POST
	@Transactional
	public Response create(HueRoom room) {
		entityManager.persist(room);
		URI uri = uriInfo.getAbsolutePathBuilder().path(room.getId().toString()).build();
		return Response.created(uri).build();
	}
	
	@GET
	public List<HueRoom> getAllRooms() {
		return hueService.getAllRooms();
	}
	
	@GET
	@Path("/{id}")
	public HueRoom retrieveRoom(@PathParam("id") Long id) {
		return entityManager.find(HueRoom.class, id);
	}
	
	@PUT
	@Path("/{id}")
	@Transactional
	public void updateRoom(@PathParam("id") Long id, HueRoom newRoom) {
		HueRoom oldRoom = entityManager.find(HueRoom.class, id);
		if(oldRoom != null) {
			oldRoom.setName(newRoom.getName());
			oldRoom.setLights(newRoom.getLights());
		} else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}
	
	@DELETE
	@Path("/{id}")
	@Transactional
	public void deleteRoom(@PathParam("id") Long id) {
		HueRoom room = entityManager.find(HueRoom.class, id);
		if (room != null) {
			entityManager.remove(room);
		} else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}
}
