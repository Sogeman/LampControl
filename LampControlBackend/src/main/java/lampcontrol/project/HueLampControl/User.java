package lampcontrol.project.HueLampControl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name="users")
@NamedQueries({
	@NamedQuery(name="user.selectAll", query="SELECT u FROM User u"),
	@NamedQuery(name="user.getUser", query="SELECT u FROM User u WHERE u.nickname = :nickname")
})
public class User {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long userId;
	
	@Column(length=100, nullable=false)
	private String username;
	
	@Column(length=32, nullable=false)
	private String nickname;
	
	@Column(length=100)
	private String bridgeIp;

	public User() {}
	
	public User(Long userId, String username, String nickname) {
		this.userId = userId;
		this.username = username;
		this.nickname = nickname;
	}
	
	public User(String username, String nickname) {
		this.username = username;
		this.nickname = nickname;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", username=" + username + ", nickname=" + nickname + "]";
	}

}
