package chess.api.services;

import chess.api.domain.publicChat.Member;
import chess.api.services.declarations.PublicChatService;
import chess.api.utils.MemberComparator;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Service
public class PublicChatServiceImpl implements PublicChatService {

    private List<Member> members = Collections.synchronizedList(new LinkedList<>());

    private final MemberComparator memberComparator;

    public PublicChatServiceImpl(MemberComparator memberComparator) {
        this.memberComparator = memberComparator;
    }

    public List<Member> addMember(Member member) {
        if (member != null) {
            members.add(member);
            members.sort(memberComparator);
        }

        return members;
    }

    public List<Member> getMembers() {
        return this.members;
    }

    public List<Member> removeMember(String sessionId) {
        members.removeIf(e -> Objects.equals(e.getSessionId(), sessionId));
        return this.members;
    }

    @Override
    public Member getMemberBySessionId(String sessionId) {
        return members.stream()
                .filter(e -> Objects.equals(e.getSessionId(), sessionId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
