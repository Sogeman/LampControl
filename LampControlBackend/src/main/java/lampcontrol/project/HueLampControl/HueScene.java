package lampcontrol.project.HueLampControl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name="scenes")
@NamedQuery(name="scene.selectAll", query="SELECT s from HueScene s")
public class HueScene {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(length=50, nullable=false)
	private String name;
	
	@Column(length=100, nullable=false)
	private String lights; // needs to be sent as array to HUE API
	
	public HueScene() {}

	public HueScene(Long id, String name, String lights) {
		this.id = id;
		this.name = name;
		this.lights = lights;
	}

	public HueScene(String name, String lights) {
		this.name = name;
		this.lights = lights;
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

	@Override
	public String toString() {
		return "HueScene [id=" + id + ", name=" + name + ", lights=" + lights
				+ "]";
	}

}
