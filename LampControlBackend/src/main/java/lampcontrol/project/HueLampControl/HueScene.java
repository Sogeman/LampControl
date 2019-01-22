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
	
	@Column(length=32)
	private Integer brightness;
	
	@Column(length=32)
	private Float x;
	
	@Column(length=32)
	private Float y;
	
	@Column(length=32)
	private String rgb;
	
	@Column
	private Boolean defaultScene;
	
	
	public HueScene() {}

	public HueScene(Long id, String name, String type, Integer brightness, Float x, Float y, String rgb, Boolean defaultScene) {
		this.id = id;
		this.name = name;
		this.brightness = brightness;
		this.x = x;
		this.y = y;
		this.rgb = rgb;
		this.defaultScene = defaultScene;
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

	public Integer getBrightness() {
		return brightness;
	}

	public void setBrightness(Integer brightness) {
		this.brightness = brightness;
	}

	public Float getX() {
		return x;
	}

	public void setX(Float x) {
		this.x = x;
	}

	public Float getY() {
		return y;
	}

	public void setY(Float y) {
		this.y = y;
	}


	public String getRgb() {
		return rgb;
	}

	public void setRgb(String rgb) {
		this.rgb = rgb;
	}

	public Boolean getDefaultScene() {
		return defaultScene;
	}

	public void setDefaultScene(Boolean defaultScene) {
		this.defaultScene = defaultScene;
	}

	@Override
	public String toString() {
		return "HueScene [id=" + id + ", name=" + name + ", brightness=" + brightness + ", x=" + x + ", y=" + y
				+ ", rgb=" + rgb + ", defaultScene=" + defaultScene + "]";
	}

}
