package lampcontrol.project.HueLampControl;

import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Inject
	private HueService hueService;
	
	@Context
	private UriInfo uriInfo;
	
	@GET
	public List<User> getAllUsers() {
		return hueService.getAllUsers();
	}
	
	@GET
	@Path("/{nickname}")
	public List<User> getUser(@PathParam("nickname") String nickname) {
		return hueService.getUser(nickname);
	}
	
	@GET
	@Path("/{id}")
	public User retrieveUser(@PathParam("id") Long id) {
		return entityManager.find(User.class, id);
	}
	
	@POST
	@Transactional
	public Response create(User user) {
		entityManager.persist(user);
		URI uri = uriInfo.getAbsolutePathBuilder().path(user.getId().toString()).build();
		return Response.created(uri).build();
	}
	
}
