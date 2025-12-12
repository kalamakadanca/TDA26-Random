namespace TdA_26_Random.WebApi.Models.Requests;

public class AddModuleRequest
{
    public string Uuid { get; set; }
    public string Title { get; set; }
    public List<string> Text { get; set; }
}