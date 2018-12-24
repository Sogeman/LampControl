package lampcontrol.project.HueLampControl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name="rooms")
@NamedQuery(name="room.selectAll", query="SELECT r from HueRoom r")
public class HueRoom {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(length=50, nullable=false)
	private String name;
	
	@Column(length=100)
	private String lights;
	
	@Column(length=50)
	private String roomClass; // allowed: Living room, Kitchen, Dining, Bedroom, Kids bedroom, Bathroom, Nursery, Recreation, Office, Gym, Hallway,	Toilet,	Front door
							  // Garage, Terrace, Garden, Driveway, Carport, Other

	
	public HueRoom() {}

	public HueRoom(Long id, String name, String lights, String roomClass) {
		this.id = id;
		this.name = name;
		this.lights = lights;
		this.roomClass = roomClass;
	}

	public HueRoom(String name, String lights, String roomClass) {
		this.name = name;
		this.lights = lights;
		this.roomClass = roomClass;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLights() {
		return lights;
	}

	public void setLights(String lights) {
		this.lights = lights;
	}

	public String getRoomClass() {
		return roomClass;
	}

	public void setRoomClass(String roomClass) {
		this.roomClass = roomClass;
	}

	@Override
	public String toString() {
		return "HueRoom [id=" + id + ", name=" + name + ", lights=" + lights + ", roomClass=" + roomClass + "]";
	}
	
	
	
}
