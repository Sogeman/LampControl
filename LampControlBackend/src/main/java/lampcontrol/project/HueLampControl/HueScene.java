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
	
	@Column(length=32, nullable=false)
	private String name;
	
	@Column(length=32, nullable=false)
	private String type = "GroupScene"; // default value for HUE API
	
	@Column(length=32)
	private String group; // group id
	
	
	public HueScene() {}

	public HueScene(Long id, String name, String type, String group) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.group = group;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	@Override
	public String toString() {
		return "HueScene [id=" + id + ", name=" + name + ", type=" + type + ", group=" + group + "]";
	}

	
	
}
